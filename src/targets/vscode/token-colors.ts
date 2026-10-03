import type { Hex } from '../../color';
import { roles } from '../../roles';

const { syntax, fg, git, border } = roles;

export type TokenColor = { name: string; scope: string[]; settings: { foreground: Hex; fontStyle?: string } };

const rule = (name: string, scope: string[], style: { color: Hex; fontStyle?: string }): TokenColor => ({
  name,
  scope,
  settings: style.fontStyle ? { foreground: style.color, fontStyle: style.fontStyle } : { foreground: style.color },
});

const deprecated = { color: fg.subtle, fontStyle: 'strikethrough' };

export const tokenColors: TokenColor[] = [
  // Generic
  rule('Comment', ['comment', 'comment.line', 'comment.block', 'punctuation.definition.comment'], syntax.comment),
  rule('Doc comment', ['comment.block.documentation'], syntax.comment),
  rule('String', ['string', 'string.quoted'], syntax.string),
  rule('Python docstring', ['string.quoted.docstring.multi.python'], syntax.comment),
  rule('Number', ['constant.numeric'], syntax.number),
  rule('Language constant', ['constant.language'], syntax.number),
  rule('Escape', ['constant.character.escape'], syntax.escape),
  rule('Symbol and key', ['constant.other.symbol', 'constant.other.key'], syntax.constant),
  rule('Self and this', ['variable.language'], syntax.variableSpecial),
  rule('Parameter', ['variable.parameter', 'entity.name.variable.parameter'], syntax.parameter),
  rule('Constant variable', ['variable.other.constant', 'variable.other.enummember'], syntax.constant),
  rule('Variable', ['variable.other.readwrite', 'variable.other.object', 'variable'], syntax.variable),
  rule('Property', ['support.variable.property', 'variable.other.property'], syntax.property),
  rule('Control keyword', ['keyword.control', 'keyword.control.flow', 'keyword.control.return', 'keyword.control.import', 'keyword.control.export'], syntax.keyword),
  rule('Expression keyword', ['keyword.operator.new', 'keyword.operator.expression'], syntax.keyword),
  rule('Operator', ['keyword.operator'], syntax.operator),
  rule('Storage and modifiers', ['storage', 'storage.type', 'storage.modifier'], syntax.modifier),
  rule('Primitive type', ['storage.type.primitive', 'support.type.primitive'], syntax.type),
  rule('Type', ['entity.name.type', 'entity.name.type.class', 'entity.other.inherited-class'], syntax.type),
  rule('Class name', ['entity.name.class'], syntax.type),
  rule('Type parameter', ['entity.name.type.type-parameter', 'meta.indexer.mappedtype.declaration'], syntax.property),
  rule('Function', ['entity.name.function', 'meta.function-call.object', 'support.function'], syntax.function),
  rule('Decorator', ['meta.decorator variable.other.readwrite', 'meta.decorator variable.other.object'], syntax.attribute),
  rule('Namespace', ['entity.name.namespace'], syntax.namespace),
  rule('Label', ['entity.name.label'], syntax.label),
  rule('Preprocessor', ['meta.preprocessor'], syntax.preproc),
  rule('Tag', ['entity.name.tag'], syntax.tag),
  rule('Attribute', ['entity.other.attribute-name'], syntax.attribute),
  rule('Punctuation', ['punctuation', 'punctuation.definition', 'punctuation.separator', 'punctuation.terminator'], syntax.punctuation),
  rule('String quotes', ['punctuation.definition.string'], syntax.string),
  rule('Interpolation punctuation', ['punctuation.definition.template-expression', 'punctuation.section.embedded'], syntax.escape),
  rule('Keyword punctuation', ['punctuation.definition.keyword'], syntax.keyword),
  rule('Regexp', ['string.regexp'], syntax.regexp),
  rule('Regexp punctuation', ['punctuation.definition.string.begin.regexp', 'punctuation.definition.group.regexp', 'punctuation.definition.character-class.regexp'], syntax.regexp),
  rule('Invalid', ['invalid'], syntax.invalid),
  rule('Deprecated', ['invalid.deprecated'], deprecated),

  // Markdown
  rule('Heading', ['markup.heading', 'entity.name.section.markdown'], syntax.title),
  rule('Bold', ['markup.bold', 'strong'], syntax.strong),
  rule('Italic', ['markup.italic', 'emphasis'], syntax.emphasis),
  rule('Inline code', ['markup.inline.raw', 'fenced_code.block.language', 'markup.fenced_code.block'], syntax.literal),
  rule('Link URI', ['markup.underline.link', 'meta.link'], syntax.linkUri),
  rule('Link text', ['string.other.link.title.markdown', 'meta.link.inline.description'], syntax.linkText),
  rule('List marker', ['beginning.punctuation.definition.list.markdown'], syntax.listMarker),
  rule('Quote', ['markup.quote.markdown'], syntax.quote),
  rule('Inserted', ['markup.inserted', 'meta.diff.header.to-file'], { color: git.added }),
  rule('Deleted', ['markup.deleted', 'meta.diff.header.from-file'], { color: git.deleted }),
  rule('Changed', ['markup.changed'], { color: git.modified }),
  rule('Separator', ['meta.separator.markdown'], { color: border.subtle }),

  // HTML / JSX
  rule('HTML tag', ['entity.name.tag', 'punctuation.definition.tag'], syntax.tag),
  rule('HTML attribute', ['entity.other.attribute-name.html', 'entity.other.attribute-name.jsx'], syntax.attribute),
  rule('JSX component', ['support.class.component'], syntax.type),
  rule('Attribute value', ['meta.tag string.quoted'], syntax.string),

  // CSS / SCSS
  rule('CSS selector', ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.other.attribute-name.parent-selector'], syntax.type),
  rule('CSS pseudo', ['entity.other.attribute-name.pseudo-class', 'entity.other.attribute-name.pseudo-element'], syntax.modifier),
  rule('CSS property', ['support.type.property-name.css'], syntax.property),
  rule('CSS number', ['constant.numeric.css', 'keyword.other.unit.css'], syntax.number),
  rule('CSS color', ['constant.other.color.rgb-value.css', 'support.constant.color.w3c-standard-color-name.css'], syntax.number),
  rule('CSS value', ['meta.property-value.css', 'support.constant.property-value.css'], { color: fg.base }),
  rule('CSS element selector', ['entity.name.tag.css'], syntax.type),
  rule('CSS at-rule', ['keyword.control.at-rule'], syntax.keyword),

  // JSON / YAML / TOML
  rule('Config key', ['support.type.property-name.json', 'entity.name.tag.yaml', 'entity.name.section.toml'], syntax.property),
  rule('JSON string', ['string.quoted.double.json'], syntax.string),
  rule('JSON constant', ['constant.language.json'], syntax.number),
  rule('TOML table', ['entity.other.attribute-name.toml'], syntax.type),

  // Shell / Dockerfile
  rule('Shell variable', ['source.shell variable.other', 'variable.other.readwrite.shell'], syntax.variable),
  rule('Shell string', ['string.quoted.double.shell', 'punctuation.definition.variable.shell'], syntax.string),
  rule('Shell keyword', ['keyword.control.shell'], syntax.keyword),
  rule('Shell builtin', ['support.function.builtin.shell'], syntax.function),
  rule('Dockerfile keyword', ['keyword.other.dockerfile'], syntax.keyword),
  rule('Dockerfile image', ['entity.name.image.dockerfile'], syntax.type),

  // Java
  rule('Java modifier', ['storage.modifier.java'], syntax.modifier),
  rule('Java primitive', ['storage.type.java'], syntax.type),
  rule('Java annotation', ['storage.type.annotation.java', 'meta.declaration.annotation.java punctuation.definition.annotation.java'], syntax.attribute),
  rule('Java class', ['entity.name.type.class.java'], syntax.type),

  // Kotlin
  rule('Kotlin modifier', ['storage.modifier.kotlin'], syntax.modifier),
  rule('Kotlin function', ['entity.name.function.kotlin'], syntax.function),
  rule('Kotlin primitive', ['support.type.primitive.kotlin'], syntax.type),

  // C#
  rule('C# modifier', ['storage.modifier.cs'], syntax.modifier),
  rule('C# primitive', ['storage.type.cs'], syntax.type),
  rule('C# attribute', ['punctuation.definition.attribute.cs', 'entity.name.type.attribute.cs'], syntax.attribute),

  // Python
  rule('Python modifier', ['storage.modifier.python'], syntax.modifier),
  rule('Python decorator', ['meta.function.decorator.python', 'entity.name.function.decorator.python'], syntax.attribute),
  rule('Python self', ['variable.parameter.function.language.python'], syntax.variableSpecial),
  rule('Python f-string', ['string.quoted.f-string.python', 'string.interpolated.python'], syntax.string),
  rule('Python f-string expression', ['constant.character.format.placeholder.other.python'], syntax.escape),

  // Go
  rule('Go primitive', ['storage.type.go'], syntax.type),
  rule('Go function', ['entity.name.function.go'], syntax.function),
  rule('Go import', ['keyword.import.go'], syntax.keyword),

  // Rust
  rule('Rust primitive', ['storage.type.core.rust', 'storage.class.std.rust'], syntax.type),
  rule('Rust lifetime', ['storage.modifier.lifetime.rust'], syntax.label),
  rule('Rust macro', ['entity.name.function.macro.rust'], syntax.function),
  rule('Rust attribute', ['meta.attribute.rust'], syntax.attribute),

  // C / C++
  rule('C primitive', ['storage.type.c', 'storage.type.cpp'], syntax.type),
  rule('C preprocessor', ['keyword.control.import.c', 'meta.preprocessor.c', 'keyword.control.directive.c'], syntax.preproc),
  rule('C macro call', ['entity.name.function.preprocessor.c'], syntax.function),

  // PHP
  rule('PHP variable', ['variable.other.php'], syntax.variable),
  rule('PHP type', ['storage.type.php'], syntax.type),
  rule('PHP function', ['entity.name.function.php'], syntax.function),

  // Ruby
  rule('Ruby symbol', ['constant.other.symbol.ruby', 'constant.other.symbol.hashkey.ruby'], syntax.constant),
  rule('Ruby instance variable', ['variable.other.readwrite.instance.ruby'], syntax.variableSpecial),
  rule('Ruby function', ['entity.name.function.ruby'], syntax.function),

  // Swift
  rule('Swift modifier', ['storage.modifier.swift'], syntax.modifier),
  rule('Swift primitive', ['keyword.expressions-and-types.swift'], syntax.type),
  rule('Swift attribute', ['support.type.attribute.swift'], syntax.attribute),

  // SQL
  rule('SQL keyword', ['keyword.other.DML.sql'], syntax.keyword),
  rule('SQL connective', ['keyword.other.alias.sql', 'keyword.other.order.sql', 'keyword.operator.logical.sql'], syntax.modifier),
  rule('SQL function', ['support.function.sql'], syntax.function),
  rule('SQL type', ['support.type.sql'], syntax.type),
  rule('SQL column', ['variable.parameter.sql'], { color: fg.base }),

  // Diff
  rule('Diff inserted', ['markup.inserted.diff'], { color: git.added }),
  rule('Diff deleted', ['markup.deleted.diff'], { color: git.deleted }),
  rule('Diff header', ['meta.diff.header'], { color: fg.muted }),
];
