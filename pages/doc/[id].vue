<template>
  <BlogHeader>
    <template v-slot:left> </template>
    <template v-slot:center>
      <div class="center-box">
        <BlogInput root-dom-name=".center" />
      </div>
    </template>
  </BlogHeader>
  <BlogLeftBox />
  <BlogRightBox />
  <div class="center" v-html="html"></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import BlogHeader from "../../components/index/BlogHeader.vue";
import BlogLeftBox from "../../components/doc/BlogLeftBox.vue";
import BlogRightBox from "../../components/doc/BlogRightBox.vue";
const html =
  ref(`<div class="markdown-body"><style>.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:16px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:24px;margin-bottom:5px}.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{font-size:20px}.markdown-body h2{padding-bottom:12px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}.markdown-body .contains-task-list{padding-left:0}.markdown-body .task-list-item{list-style:none}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}</style><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/18/172c6d93c9dd95e5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="DOM" loading="lazy" class="medium-zoom-image"></p>
<h3 data-id="heading-0">写在前面</h3>
<p>一直以来，我们都对在 JS 中取到 DOM 节点没有任何疑问。</p>
<p>想要取到 body，<code>document.body</code> 就能直接取到 body 节点对象，又或者 <code>document.querySelector([selector])</code> 可以查找到你需要的任何 DOM 节点。</p>
<p>但是我们取到的 DOM 节点对象是什么时候生成的呢？</p>
<p>以前我也没有思考过这其中的原理。</p>
<h3 data-id="heading-1">思考起源</h3>
<p>我也是在设计可视化平台的热图方案时遇到的一个问题。</p>
<p>在方案中，我们需要找到点击时被点击元素在 <code>querySelectorAll</code> 结果中的位置，并把这个位置上报到后台，以便后期查看热图的时候反显该元素的点击热区（通过同样的选择器 querySelectorAll 和 index 信息）。</p>
<p>实践之前定的方案是使用 <code>findIndex</code> 查找到元素在 <code>querySelectorAll</code> 结果中的位置，类似下面的代码：</p>
<pre><code class="hljs language-javascript copyable" lang="javascript">
<span class="hljs-comment">// 点击元素</span>
<span class="hljs-keyword">const</span> target = event.<span class="hljs-property">target</span>

<span class="hljs-comment">// 点击元素的选择器筛选结果</span>
<span class="hljs-keyword">const</span> elements = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">'.class &gt; li'</span>)

<span class="hljs-comment">// 元素在结果列表中的位置</span>
<span class="hljs-keyword">const</span> i = <span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">findIndex</span>.<span class="hljs-title function_">call</span>(elements, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e === target)

<span class="hljs-comment">// 上报数据 i </span>
...

<span class="copy-code-btn">复制代码</span></code></pre>
<p>到这里为止，上面的代码就存在一个可能的问题，你看出来了吗？</p>
<p>这个方案在跟一起设计方案的同学对齐的时候大家都没提出疑问，直到后面把方案同步给实施的同学。。。</p>
<h3 data-id="heading-2">疑问</h3>
<p>我们知道，在 JS 中取到的 DOM 节点都是以一个对象的形式存在的。</p>
<p>从 DOM 表现的各个方面可以得出这个结论：</p>
<ul>
<li>JS DOM 元素可以通过点击获取之上的属性</li>
<li>任何 JS DOM 都有标准 DOM 方法，例如 <code>querySelectorAll </code> ...</li>
<li>...</li>
</ul>
<p>而对一个引用类型的对象，我们通常是不会使用 <code>object1 === object2</code> 的方式去判断是否相等的，如果 <code>object1 === object2</code> 比较的结果为 <code>true</code>，那么只能说明这两个对象是同一块内存。</p>
<p>那么问题来了，我们上面的热图方案中，使用：</p>
<pre><code class="hljs language-javascript copyable" lang="javascript">
<span class="hljs-comment">// 元素在结果列表中的位置</span>
<span class="hljs-keyword">const</span> i = <span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">findIndex</span>.<span class="hljs-title function_">call</span>(elements, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e === target)

<span class="copy-code-btn">复制代码</span></code></pre>
<p>上面一行代码查找的元素位置，真的能查到吗？（这里没法使用对象深比较，因为目的就是为了判断是否是同一对象，而不是对象是否内容相等）</p>
<p>会不会查出的结果固定为 -1 ，两个对象根本没法判断呢。</p>
<p>当时实施同学提出这个问题，让我一阵恐慌，因为整个热图方案是建立在反显回来能查找到元素位置的前提下的，如果这个位置都没法上报那么整个方案又要推倒重来。</p>
<h4 data-id="heading-3">其他方案？</h4>
<p>不是没考虑过上报元素在整个链路中的位置，例如： 'body &gt; .class1:nth-child(i) &gt; class2:nth-child(i) &gt; ... &gt; li:nth-child(i)' 这种模式。</p>
<p>但是这个方案只是想想就废弃了。因为只要页面中的嵌套元素过多，整个链路将无比的长，而这种情况在在三大框架大行其道的组件化方案中是及其常见的。</p>
<h4 data-id="heading-4">第一次尝试</h4>
<p>经验告诉我肯定是出了问题，直觉却告诉我或许是可行的。</p>
<p>之前一直觉得 DOM 节点对象有些特殊（另一个一起对方案的同学可能也是同样的 feel 才没提出疑问），虽然也说不出来有什么特殊的。。。</p>
<p>抱着试试的心态，先粗略对比打开浏览器测试一下：</p>
<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/18/172c69075d49823e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="console" loading="lazy" class="medium-zoom-image"></p>
<p>结果果然。。。两个 DOM 节点对比是相等的。</p>
<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/18/172c6915938f1559~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="坑爹" loading="lazy" class="medium-zoom-image"></p>
<p>怎么回事？难道 DOM 节点对象是特殊的？没听说过 JS 还能有特殊对象啊？</p>
<p>这是我的第一反应。</p>
<p>但是作为一个严（xia）谨（gao） 的开发者，我们一定要冷静下来分析：</p>
<p>首先排除特殊对象的可能性，这不科。。。诶不对，这貌似很 JS 啊。(JS 听了想打人)</p>
<p>但我们还是排除 JS 开后门的可能性吧，不能在错误的路上越走越远，就假定 DOM 是一个正常对象，那么唯一的可能性就是：</p>
<h4 data-id="heading-5">DOM 对象是唯一的，每次 <code>querySelectorAll</code>、<code>querySelector</code>、<code>getElementById</code>、<code>child.parentNode</code>等等方法，查回来的 DOM 都是同一个对象。</h4>
<p>感觉隐隐约约接近真相了，如果 DOM 对象正常，这就是唯一合理的解释。那么这只是 <code>querySelector</code>，接下来我们需要更多测试：</p>
<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/18/172c6c8acff5e051~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="test" loading="lazy" class="medium-zoom-image"></p>
<p>输出 0 ，表示找到了该元素。</p>
<p>到这里总算松了一口气，热图方案依旧可行，猜想也是符合结果的。</p>
<h3 data-id="heading-6">结论</h3>
<p>那么到这里我们可以大胆推论：</p>
<h4 data-id="heading-7">JS 中 DOM 对象其实是从浏览器加载开始就不断由浏览器自动解析生成的对象，并且在任何获取 DOM 的方法中都是返回该 DOM 的引用。</h4>
<p>之所以说不断解析，是因为我想到了一个场景：</p>
<pre><code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// 这里能取到 div1</span>
        <span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">'#div1'</span>) === <span class="hljs-string">'object'</span>
        <span class="hljs-comment">// 这里取不到 div2</span>
        <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">'#div2'</span>) === <span class="hljs-literal">undefined</span>
        
        <span class="hljs-comment">// 我们知道 js 是阻塞加载的，所以在 JS 执行中取不到后面加载的元素，所以说明下面的 DOM 对象还没生成。</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="copy-code-btn">复制代码</span></code></pre>
<p>确实这很合理，我之前一直以为 DOM 方法取到的节点对象是在每次查询的时候会新生成，看来是误解了。</p>
<p>仔细想想，我们能直接通过</p>
<pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">children</span>[i].<span class="hljs-property">children</span>[i].<span class="hljs-property">children</span>...
<span class="copy-code-btn">复制代码</span></code></pre>
<p>链一直取到具体元素，其实就是在暗示这所有 DOM 节点对象其实都是被预定义好的。</p>
<p>那么通过方法去查找元素，返回该元素的引用也非常合理，还能节约内存。</p>
<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/18/172c6db912926859~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="点赞" loading="lazy" class="medium-zoom-image"></p>
<h3 data-id="heading-8">后记</h3>
<p>后面也查阅了一些资料，其实也可以用 node.isSameNode 判断是否是同一个节点，但是推荐方式还是使用 === 判断。</p>
<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/2/1730edd39a599aaf~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="isSameNode文档" loading="lazy" class="medium-zoom-image"></p>
<h4 data-id="heading-9">以后就尽情去 <code>===</code> 比较元素对象吧！</h4>
<p>-- The End.</p><style>.markdown-body pre,.markdown-body pre>code.hljs{color:#333;background:#f8f8f8}.hljs-comment,.hljs-quote{color:#998;font-style:italic}.hljs-keyword,.hljs-selector-tag,.hljs-subst{color:#333;font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-attribute,.hljs-name,.hljs-tag{color:navy;font-weight:400}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built_in,.hljs-builtin-name{color:#0086b3}.hljs-meta{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}</style></div>`);
</script>
<style lang="less" scoped>
.center-box {
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
}
.center {
  margin: auto;
  margin-top: 75px;
  margin-left: 20%;
  width: 50vw;
  min-height: 90vh;
  background-color: antiquewhite;
}
</style>
