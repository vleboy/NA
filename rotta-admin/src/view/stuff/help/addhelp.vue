<template>
  <div class="addhelp">
    <div class="help-editor">
      <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    </div>
    <div class="editor-btn">
        <el-button type="primary" @click="submit">提交</el-button>
         <el-button @click="resetContent">重置</el-button>
    </div>
    <div class="content-output">
        <div v-html="content || '暂无内容'">       
        </div>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
export default {
    beforeCreate () {
      this.$store.commit({
        type: 'recordNowindex',
        data: 'addhelp'
      })
      this.$store.commit('returnLocalStorage')
    },
    data: function(){
        return {
            content: '<p>输入帮助内容......</p>',
            editorOption: {
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        resetContent() {
          this.$confirm('该操作会清空当前编辑记录，请问是否确定?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.content = '<p>输入帮助内容......</p>'
            this.$message({
              type: 'success',
              message: '已清空!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        },
        submit(){
            // console.log(this.content);
            this.$message.success('提交成功！');
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
}
</script>
<style scoped>
/* .addhelp{width: 100%;height: 100%} */
.addhelp .help-editor{margin:1rem auto;width: 95%;}
.addhelp .content-output{margin:1rem auto;width: 93%;color: #222}
.quill-editor{height: 300px}
.editor-btn{margin: 5.5rem 3rem 0 0;text-align: right;}
</style>