import{o as n,c as s,a,b as t}from"./app.80913d4a.js";const e='{"title":"Setter Injection","description":"","frontmatter":{},"headers":[{"level":2,"title":"Explicit Setter Injection with [SetterProperty] Attributes","slug":"explicit-setter-injection-with-setterproperty-attributes"},{"level":2,"title":"Inline Setter Configuration","slug":"inline-setter-configuration"},{"level":2,"title":"Setter Injection Policies","slug":"setter-injection-policies"}],"relativePath":"guide/ioc/setter-injection.md","lastUpdated":1629294083778}',p={},o=t('<h1 id="setter-injection"><a class="header-anchor" href="#setter-injection" aria-hidden="true">#</a> Setter Injection</h1><div class="tip custom-block"><p class="custom-block-title">INFO</p><p>In all cases, <em>Setter Injection</em> is an opt-in feature in Lamar that has to be explicitly enabled on a case by case basis.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>All the <em>Setter Injection</em> rules and attributes are ignored at runtime if Lamar does not know how to resolve the property type. If setter injection is not working for you, try to look at the <a href="/guide/ioc/diagnostics/what-do-i-have.html">WhatDoIHave()</a> output and <a href="/guide/ioc/diagnostics/type-scanning.html">type scanning</a>.</p></div><p>Lamar can inject dependencies into public setter properties as part of its construction process using the <em>Setter Injection</em> form of Dependency Injection. However, the Lamar team strongly recommends using constructor injection wherever possible instead of setter injection. That being said, there are few cases where setter injection is probably easier (inheritance hierarchies), not to mention legacy or third party tools that simply cannot support constructor injection <em>cough</em> <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> <em>cough</em>.</p><p>See this discussion from Martin Fowler on <a href="http://martinfowler.com/articles/injection.html#ConstructorVersusSetterInjection" target="_blank" rel="noopener noreferrer">Constructor vs Setter Injection</a>.</p><p><strong>If you are having any trouble with setter injection in your Lamar usage, make sure you&#39;re familiar with using <a href="/guide/ioc/diagnostics/build-plans.html">build plans</a> to help in troubleshooting</strong></p><h2 id="explicit-setter-injection-with-setterproperty-attributes"><a class="header-anchor" href="#explicit-setter-injection-with-setterproperty-attributes" aria-hidden="true">#</a> Explicit Setter Injection with [SetterProperty] Attributes</h2><p>The simplest conceptual way to force Lamar into making public setters mandatory service dependencies by decorating setter properties with the <code>[SetterProperty]</code> attribute like this example:</p>',8),c=t('<p><a id="snippet-sample_setter-injection-with-setterproperty"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Repository</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// Adding the SetterProperty to a setter directs</span>\n    <span class="token comment">// Lamar to use this property when</span>\n    <span class="token comment">// constructing a Repository instance</span>\n    <span class="token punctuation">[</span>SetterProperty<span class="token punctuation">]</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">IDataProvider</span> Provider <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n\n    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">SetterProperty</span></span><span class="token punctuation">]</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> ShouldCache <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Examples/SetterExamples.cs#L21-L33" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_setter-injection-with-setterproperty" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>Without the <code>[SetterProperty]</code> attributes decorating the setters, Lamar would ignore the <code>Provider</code> and <code>ShouldCache</code> properties when it builds up a <code>Repository</code> object. With the attributes, Lamar will try to build and attach values for the two properties as part of object construction.</p><p>If you were to look at Lamar&#39;s &quot;build plan&quot; for the <code>Repository</code> class, you would see the actual C# code that Lamar compiles to build the concrete objects:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lamar_Testing_Examples_Repository_repository</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Lamar<span class="token punctuation">.</span>IoC<span class="token punctuation">.</span>Resolvers<span class="token punctuation">.</span>TransientResolver<span class="token punctuation">&lt;</span>Lamar<span class="token punctuation">.</span>Testing<span class="token punctuation">.</span>Examples<span class="token punctuation">.</span>Repository<span class="token punctuation">&gt;</span></span></span>\n<span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> func_repository_bool <span class="token punctuation">{</span><span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span><span class="token punctuation">}</span>\n\n\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">Lamar<span class="token punctuation">.</span>Testing<span class="token punctuation">.</span>Examples<span class="token punctuation">.</span>Repository</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token class-name">Lamar<span class="token punctuation">.</span>IoC<span class="token punctuation">.</span>Scope</span> scope<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name"><span class="token keyword">var</span></span> dataProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Lamar<span class="token punctuation">.</span>Testing<span class="token punctuation">.</span>Examples<span class="token punctuation">.</span>DataProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Lamar<span class="token punctuation">.</span>Testing<span class="token punctuation">.</span>Examples<span class="token punctuation">.</span>Repository</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>Provider <span class="token operator">=</span> dataProvider<span class="token punctuation">,</span> ShouldCache <span class="token operator">=</span> func_repository_bool<span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre></div><p>Alas, like almost every code generation tool in the history of computer science, the resulting code isn&#39;t terribly pretty. You may find it easier to read and parse by copying the code into a real class file and letting your tool of choice (ReSharper or Rider for me) reformat the code and clean up.</p><p>If you intensely dislike runaway attribute usage, that&#39;s okay because there are other ways to enable setter injection in Lamar.</p><h2 id="inline-setter-configuration"><a class="header-anchor" href="#inline-setter-configuration" aria-hidden="true">#</a> Inline Setter Configuration</h2><p>Any setter property not configured with <code>[SetterProperty]</code> or the setter policies in the next section can still be filled by Lamar if an inline dependency is configured matching that setter property as shown in the example below:</p>',10),i=t('<p><a id="snippet-sample_inline-dependencies-setters"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuleWithSetters</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEventRule</span></span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">ICondition</span> Condition <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">IAction</span> Action <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessEvent</span><span class="token punctuation">(</span><span class="token class-name">SomeEvent</span> @<span class="token keyword">event</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>Condition<span class="token punctuation">.</span><span class="token function">Matches</span><span class="token punctuation">(</span>@<span class="token keyword">event</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            Action<span class="token punctuation">.</span><span class="token function">PerformWork</span><span class="token punctuation">(</span>@<span class="token keyword">event</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuleWithSettersRegistry</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ServiceRegistry</span></span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token function">RuleWithSettersRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEventRule<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>RuleWithSetters<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Setter</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICondition<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Is</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Condition1<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n            <span class="token comment">// or if you need to specify the property name</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Setter</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IAction<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;Action&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Is</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Action2<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Examples/inline_dependencies.cs#L212-L240" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_inline-dependencies-setters" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>See also: <a href="/guide/ioc/registration/inline-dependencies.html">Inline Dependencies</a></p><h2 id="setter-injection-policies"><a class="header-anchor" href="#setter-injection-policies" aria-hidden="true">#</a> Setter Injection Policies</h2><p>Lastly, you can give Lamar some criteria for determining which setters should be mandatory dependencies with the <code>Registry.Policies.SetAllProperties()</code> method during Container setup as shown in this example below:</p>',6),l=t('<p><a id="snippet-sample_using-setter-policy"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClassWithNamedProperties</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Age <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> LastName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> FirstName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">IGateway</span> Gateway <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">IService</span> Service <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">specify_setter_policy_and_construct_an_object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> theService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ColorService</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>theService<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IGateway<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DefaultGateway<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ClassWithNamedProperties<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Setter</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        x<span class="token punctuation">.</span>Policies<span class="token punctuation">.</span><span class="token function">SetAllProperties</span><span class="token punctuation">(</span>\n            policy <span class="token operator">=&gt;</span> policy<span class="token punctuation">.</span><span class="token function">WithAnyTypeFromNamespace</span><span class="token punctuation">(</span><span class="token string">&quot;StructureMap.Testing.Widget3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name"><span class="token keyword">var</span></span> description <span class="token operator">=</span> container<span class="token punctuation">.</span>Model<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ClassWithNamedProperties<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">DescribeBuildPlan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name"><span class="token keyword">var</span></span> target <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ClassWithNamedProperties<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    target<span class="token punctuation">.</span>Service<span class="token punctuation">.</span><span class="token function">ShouldBeSameAs</span><span class="token punctuation">(</span>theService<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    target<span class="token punctuation">.</span>Gateway<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DefaultGateway<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/setter_injection.cs#L277-L311" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using-setter-policy" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>All calls to <code>Registry.Policies.SetAllProperties()</code> are additive, meaning you can use as many criteria as possible for setter injection.</p>',4);p.render=function(t,e,p,u,r,k){return n(),s("div",null,[o,a(" snippet: sample_setter-injection-with-SetterProperty "),c,a(" snippet: sample_inline-dependencies-setters "),i,a(" snippet: sample_using-setter-policy "),l])};export{e as __pageData,p as default};
