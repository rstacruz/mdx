'use strict'

const Mdx = require('./index')
const usePreludes = require('./filters/preludes')
const useFormat = require('./filters/format')
const normalize = require('./md_block').normalize

/**
 * A document parsing context.
 */

class Context {
  constructor (fname, src) {
    const lang = Mdx.detectLanguage(fname)
    if (!lang) throw new Error(`Unknown language for '${fname}'`)

    // <String> The filename.
    this.filename = fname

    // <String> The source code to be parsed.
    this.src = src

    // <Object> The block to be parsed
    this.block = undefined

    // <Array> The block
    this.blocks = []

    // <Language> Language instance
    this.language = lang

    // <Matcher> The rule set of the language
    this.rules = this.language.rules()
  }

  /**
   * Considers the last `block` as "done" and pushes it to the blocks list,
   * then it starts a new block.
   *
   *   ctx.flush()
   */

  flush () {
    this.finalizeBlock()
    this.block = this.newBlock()
  }

  /**
   * Considers the last `block` as "done" and pushes it to the blocks list.
   */

  finalizeBlock () {
    if (this.block && this.block.location.doc.start !== null) {
      this.block.raw = this.block._rawlines.join('\n') + '\n'
      this.block.markdown = normalize(this.block.raw, { lang: this.language.slug() })
      delete this.block._rawlines

      // Parse out preludes into title and such
      this.block = usePreludes(this.block, this)
      this.block = useFormat(this.block, this)

      // If the filters decided it's not a block, don't add it
      if (!this.block) return

      // If it's an unrecognized block, don't add it
      if (!this.block.explicit && !this.block.title) return

      this.blocks.push(this.block)
    }
  }

  /**
   * Creates the initial state for a block object.
   *
   *   this.block = this.newBlock()
   */

  newBlock () {
    return {
      location: {
        file: this.filename,
        doc: { start: null, end: null },
        code: { start: null }
      },
      _rawlines: []
    }
  }

  /*
   * Goes through each line of the source and creates the blocks.
   *
   *   ctx = new Context(...)
   *   ctx.process()
   *   ctx.blocks //=> ...
   */

  process () {
    const ctx = this
    ctx.flush()

    eachLine(ctx.src, function (line, i) {
      ctx.rules.switch(line, {

        // single line block comment
        docshort (m) {
          return
        },

        // opening block, explicit
        docstartex (m) {
          ctx.flush()
          ctx.block.location.doc.start = i + 1
          if (m.doc) ctx.block._rawlines.push(m.doc)
          ctx.block.explicit = true
        },

        // opening block
        docstart (m) {
          ctx.flush()
          ctx.block.location.doc.start = i + 1
          if (m.doc) ctx.block._rawlines.push(m.doc)
        },

        // closing block
        // skip other */'s if it's not needed
        docend (m) {
          if (ctx.block.location.doc.end !== null) return
          ctx.block.location.doc.end = i + 1
        },

        // inside a block
        doc (m) {
          ctx.block._rawlines.push(m.doc)
        },

        // code
        // skip if prelude was already saved
        else (m) {
          if (ctx.block.prelude) return

          line = line.trim()
          if (line === '') return
          ctx.block.prelude = line
          ctx.block.location.code.start = i + 1
        }
      })
    })

    ctx.finalizeBlock()
  }
}

/*
 * Helpers
 */

function eachLine (src, fn) {
  src.split('\n').forEach(fn)
}

module.exports = Context
