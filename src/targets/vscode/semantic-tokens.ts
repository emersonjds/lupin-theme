import { roles, type Style } from '../../roles';

const { syntax } = roles;

const toSemantic = (style: Style) => (style.fontStyle ? { foreground: style.color, fontStyle: style.fontStyle } : { foreground: style.color });

export const semanticTokenColors = {
  namespace: toSemantic(syntax.namespace),
  class: toSemantic(syntax.type),
  'class.declaration': toSemantic(syntax.type),
  enum: toSemantic(syntax.type),
  enumMember: toSemantic(syntax.constant),
  interface: toSemantic(syntax.type),
  struct: toSemantic(syntax.type),
  typeParameter: toSemantic(syntax.property),
  type: toSemantic(syntax.type),
  parameter: toSemantic(syntax.parameter),
  variable: toSemantic(syntax.variable),
  'variable.readonly': toSemantic(syntax.variable),
  property: toSemantic(syntax.property),
  'property.readonly': toSemantic(syntax.property),
  decorator: toSemantic(syntax.attribute),
  event: toSemantic(syntax.property),
  function: toSemantic(syntax.function),
  'function.defaultLibrary': toSemantic(syntax.function),
  method: toSemantic(syntax.function),
  macro: toSemantic(syntax.function),
  label: toSemantic(syntax.label),
  comment: toSemantic(syntax.comment),
  string: toSemantic(syntax.string),
  keyword: toSemantic(syntax.keyword),
  number: toSemantic(syntax.number),
  regexp: toSemantic(syntax.regexp),
  operator: toSemantic(syntax.operator),
  // Modifiers: only deprecated changes the look
  '*.deprecated': { strikethrough: true },
};
