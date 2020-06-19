// @ts-nocheck

'use strict'

const stylelint = require('stylelint')
const report = stylelint.utils.report
const ruleMessages = stylelint.utils.ruleMessages
const validateOptions = stylelint.utils.validateOptions

const ruleName = 'plugin/declaration-block-single-line'

const messages = ruleMessages(ruleName, {
  expectedRuleSingleLine: () => 'Rule should be on a single line',
  rejectedRuleSingleLine: () => 'Rule shouldn\'t be on a single line',
  expectedDeclarationSingleLine: () => 'Declaration should be on a single line',
  rejectedDeclarationSingleLine: () => 'Declaration shouldn\'t be on a single line'
})

function rule (expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        true,
        false
      ]
    })

    if (!validOptions) {
      return
    }

    // root.walkAtRules(check)

    root.walkRules(rule => {
      checkRule(rule)
      rule.walkDecls(checkDecl)
    })

    function checkRule (rule) {
      if (!rule) return

      if (context.fix) {
        rule.raws.after = expectation ? ' ' : '\n'
        return
      }

      const singleLine = !(/\r|\n/.exec(rule.raws.after))

      if (expectation && !singleLine) {
        report({
          message: messages.expectedRuleSingleLine(),
          node: rule,
          result,
          ruleName
        })
      }

      if (!expectation && singleLine) {
        report({
          message: messages.rejectedRuleSingleLine(),
          node: rule,
          result,
          ruleName
        })
      }
    }

    function checkDecl (statement) {
      if (!statement) return

      if (context.fix) {
        statement.raws.before = expectation ? ' ' : '\n'
        return
      }

      const singleLine = !(/\r|\n/.exec(statement.raws.before))

      if (expectation && !singleLine) {
        report({
          message: messages.expectedDeclarationSingleLine(),
          node: statement,
          result,
          ruleName
        })
      }

      if (!expectation && singleLine) {
        report({
          message: messages.rejectedDeclarationSingleLine(),
          node: statement,
          result,
          ruleName
        })
      }
    }
  }
}

module.exports = stylelint.createPlugin(ruleName, rule)
module.exports.ruleName = ruleName
module.exports.messages = messages
