<template>
  <div>
     
  </div>
</template>

<script>
import {music,banner} from '@/http/api'
export default {
    name:'cheshi',
    methods: {
        async mm(){
            // const res = await music.getSongDetail('1442398087')
            // console.log(res.data.songs[0].al.picUrl);
        }
    },
    mounted(){
        this.mm()
        alert('hello,fanzhao')
        banner.getBanner().then(res=>{
            console.log(res);
        })
    }
}
</script>

<style>

</style>