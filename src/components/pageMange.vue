<template>
 <div>
     <div class="title"> <span>页面</span> <img src="../../static/image/addPage.png" alt="加载失败"> </div>
  <el-tree :data="data" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
 </div>

</template>
<script>
export default {
    data() {
        return {
            data: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                        
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                         
                        },
                        {
                            label: '二级 2-2',
                          
                        }
                    ]
                },
       
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log('树形菜单被点击', data);
        }
    }
};
</script>
<style  scoped>
.title{
height: 48px;
width: 100%;
border-bottom:  1px solid #eeeeee;
line-height: 48px;
}
.title>span{
    margin-left: 90px;
    margin-right: 70px;
}
.title img{
    
    width: 30px;
    height: auto;
    vertical-align: middle;
}
</style>

