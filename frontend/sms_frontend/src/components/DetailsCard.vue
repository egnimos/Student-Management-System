<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
    image: String,
    description: String,
})


</script>

<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-10">
            <div class="col-md-4">
                <img :src="image" class="img-fluid rounded-start" style="object-fit: center; height: 100%;"
                    alt="profile image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-semibold fs-3">{{ title }}</h5>
                    <p class="card-text fw-medium fs-5">{{ description }}</p>
                    <p class="card-text fw-medium"><small class="text-body-secondary">{{ subtitle }}</small></p>
                </div>
            </div>
        </div>
    </div>
</template>