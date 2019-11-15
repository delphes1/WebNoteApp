<template>
    <span>
        <home-presentation></home-presentation>
        <home-explications></home-explications>
        <home-footer></home-footer>
       
    </span>
</template>
<script>
// @ is an alias to /src
import HomePresentation from '@/components/HomePresentation';
import HomeExplications from '@/components/HomeExplications';
import HomeFooter from '@/components/HomeFooter';
export default {
  name: "home",
  components: {
    HomePresentation,
    HomeExplications,
    HomeFooter
  }
};
</script>
