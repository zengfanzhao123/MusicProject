<template>
  
</template>

<script>
export default {
    name:'transfer',
    mounted(){
        let url = this.$route.query.url
        let id = this.$route.query.id
        this.$router.push({
            name: url,
            query:{id}
        })
    }
}
</script>

<style>

</style>