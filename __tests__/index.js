const rule = require('..')
const { messages, ruleName } = rule

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: 'div { width: 100px; height: 20px; margin: 0; }'
    }
  ],

  reject: [
    {
      code: 'div { width: 100px; height: 20px; margin: 0;\n}',
      message: messages.expectedRuleSingleLine(),
      line: 1,
      column: 1,
      description: 'Newline at the end of the rule'
    },
    {
      code: 'div { width: 100px;\n height: 20px; margin: 0; }',
      message: messages.expectedDeclarationSingleLine(),
      line: 2,
      column: 2,
      description: 'Newline before declaration'
    }
  ]
})

testRule(rule, {
  ruleName,
  config: [false],

  accept: [
    {
      code: 'div {\n width: 100px;\n height: 20px;\n margin: 0;\n}'
    }
  ],

  reject: [
    {
      code: 'div { width: 100px; height: 20px; margin: 0; }',
      message: messages.rejectedRuleSingleLine(),
      line: 1,
      column: 1,
      description: 'Missing newline at the end of the rule'
    },
    {
      code: 'div { width: 100px;\n height: 20px; margin: 0;\n}',
      message: messages.rejectedDeclarationSingleLine(),
      line: 1,
      column: 7,
      description: 'Missing newline before declaration'
    }
  ]
})
