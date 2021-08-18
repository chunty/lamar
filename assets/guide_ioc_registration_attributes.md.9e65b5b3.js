import{o as n,c as a,a as s,d as t,e,b as p}from"./app.80913d4a.js";const o='{"title":"Using Attributes for Configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Attribute Targeting Plugin Type or Concrete Type","slug":"attribute-targeting-plugin-type-or-concrete-type"},{"level":2,"title":"Built In Attributes","slug":"built-in-attributes"}],"relativePath":"guide/ioc/registration/attributes.md","lastUpdated":1629294083796}',c={},i=t("h1",{id:"using-attributes-for-configuration"},[t("a",{class:"header-anchor",href:"#using-attributes-for-configuration","aria-hidden":"true"},"#"),e(" Using Attributes for Configuration")],-1),l=t("p",null,[e("The Lamar team believe that forcing users to spray .Net attributes all over their own code is in clear violation of our philosophy of minimal intrusion into user code. "),t("em",null,"In other words, we don't want to be MEF.")],-1),r=t("p",null,[e("That being said, there are plenty of times when simple attribute usage is effective for one-off deviations from your normal registration conventions or cause less harm than having to constantly change a centralized "),t("code",null,"ServerRegistry"),e(" or just seem more clear and understandable to users than a convention. For those usages, Lamar 4.0 has introduced a new base class that can be extended and used to explicitly customize your Lamar configuration:")],-1),u=p('<p><a id="snippet-sample_lamarattribute"></a></p><div class="language-cs"><pre><code><span class="token comment">/// &lt;summary&gt;</span>\n<span class="token comment">/// Base class for custom configuration attributes</span>\n<span class="token comment">/// &lt;/summary&gt;</span>\n<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">LamarAttribute</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Attribute</span></span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// Make configuration alterations to a single IConfiguredInstance object</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token comment">/// &lt;param name=&quot;instance&quot;&gt;&lt;/param&gt;    </span>\n    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Alter</span><span class="token punctuation">(</span><span class="token class-name">IConfiguredInstance</span> instance<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// Make configuration changes to the most generic form of Instance</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token comment">/// &lt;param name=&quot;instance&quot;&gt;&lt;/param&gt;</span>\n    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Alter</span><span class="token punctuation">(</span><span class="token class-name">Instance</span> instance<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        \n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar/LamarAttribute.cs#L6-L29" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_lamarattribute" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>There&#39;s a couple thing to note, here about this new attribute:</p><ul><li>Lamar internals are looking for any attribute of the base class. Attributes that affect types are read and applied early, while attributes decorating properties or constructor parameters are only read and applied during the creation of <a href="/guide/ioc/diagnostics/build-plans.html">build plans</a>.</li><li>Unlike many other frameworks, the attributes in Lamar are not executed at build time. Instead, Lamar uses attributes <em>one time</em> to determine the build plan.</li></ul><h2 id="attribute-targeting-plugin-type-or-concrete-type"><a class="header-anchor" href="#attribute-targeting-plugin-type-or-concrete-type" aria-hidden="true">#</a> Attribute Targeting Plugin Type or Concrete Type</h2><p>Take the new <code>[Singleton]</code> attribute shown below:</p>',7),k=p('<p><a id="snippet-sample_singletonattribute"></a></p><div class="language-cs"><pre><code><span class="token comment">/// &lt;summary&gt;</span>\n<span class="token comment">/// Makes Lamar treat a Type as a singleton in the lifecycle scoping</span>\n<span class="token comment">/// &lt;/summary&gt;</span>\n<span class="token punctuation">[</span><span class="token function">AttributeUsage</span><span class="token punctuation">(</span>AttributeTargets<span class="token punctuation">.</span>Class <span class="token operator">|</span> AttributeTargets<span class="token punctuation">.</span>Interface<span class="token punctuation">)</span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonAttribute</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">LamarAttribute</span></span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// This method will affect single registrations</span>\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Alter</span><span class="token punctuation">(</span><span class="token class-name">IConfiguredInstance</span> instance<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        instance<span class="token punctuation">.</span>Lifetime <span class="token operator">=</span> ServiceLifetime<span class="token punctuation">.</span>Singleton<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar/SingletonAttribute.cs#L7-L20" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_singletonattribute" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>This new attribute can be used on either the plugin type (typically an interface) or on a concrete type to make an individual type registration be a singleton. You can see the usage on some types below:</p>',4),m=p('<p><a id="snippet-sample_[singleton]-usage"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Singleton</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingleWidget</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IWidget</span></span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>NotImplementedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/attribute_usage.cs#L57-L66" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_[singleton]-usage" title="Start of snippet">anchor</a></sup><a id="snippet-sample_[singleton]-usage-1"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Singleton</span></span><span class="token punctuation">]</span> <span class="token comment">// ALL Instance&#39;s of ITeamCache will be singletons by default</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ITeamCache</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TeamCache</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITeamCache</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherTeamCache</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITeamCache</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ITeam</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Chargers</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITeam</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n\n<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Singleton</span></span><span class="token punctuation">]</span> <span class="token comment">// This specific type will be a singleton</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Chiefs</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITeam</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/attribute_usage.cs#L52-L67" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_[singleton]-usage-1" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="built-in-attributes"><a class="header-anchor" href="#built-in-attributes" aria-hidden="true">#</a> Built In Attributes</h2><p>Lamar supplies a handful of built in attributes for customizing configuration:</p><ul><li><code>[ValidationMethod]</code> - Allows you to expose <a href="/guide/ioc/diagnostics/environment-tests.html">environment tests</a> in your Lamar registrations</li><li><code>[DefaultConstructor]</code> - Declare which constructor function should be used by Lamar. See <a href="/guide/ioc/registration/constructor-selection.html">constructor selection</a> for more information</li><li><code>[Scoped]</code> and <code>[Singleton]</code> - These attributes, just add another mechanism for [life cycle configuration](/guide/ioc/lifetime;title=lifecycle configuration)</li><li><code>[InstanceNamed(&quot;name&quot;)]</code> to override the instance name of a registered concrete class</li></ul>',8);c.render=function(t,e,p,o,c,d){return n(),a("div",null,[i,l,r,s(" snippet: sample_LamarAttribute "),u,s(" snippet: sample_SingletonAttribute "),k,s(" snippet: sample_[Singleton]-usage "),m])};export{o as __pageData,c as default};
