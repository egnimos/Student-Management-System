<script setup>
// import { defineProps } from 'vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()
const { columns, data, col_name_clickable, deleteData, editData, navigate } = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => []
  },
  col_name_clickable: String,
  deleteData: Function,
  editData: Function,
  navigate: Function,
})

let isDeleting = ref(false);
async function deleteD(i, dataId) {
  try {
    isDeleting.value = true
    await deleteData(dataId);
    toast.success("Deleted Succesfully")
    data.splice(i, 1)
  } catch (error) {
    console.log("Error while delete data in a table: ", error)
    toast.error("Failed to delete data")
  } finally {
    isDeleting.value = false
  }
}

function clickAction(cell_value, column, i, data) {
  switch (true) {
    case cell_value === 'delete':
      deleteD(i, data[0])
      break;
    case cell_value === 'edit':
      editData(data[0])
      break;
    case column === col_name_clickable:
      navigate(data);
      break;
    default:
      break;
  }
}

console.log(columns)
</script>

<template>
  <div class="py-5">
    <table class="table table-striped-columns table-bordered">
      <thead>
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col" v-for="co in columns" :key="co">{{ co }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in data" :key="i">
          <!-- <th scope="row">{{ i }}</th> -->
          <td v-for="(c, ci) in columns" :key="ci" :class="[
            d[ci] == 'delete' ? 'text-danger' : '',
            d[ci] == 'edit' ? 'text-secondary' : '',
            c == col_name_clickable ? 'text-primary' : '',
          ]" :style="d[ci] === 'delete' || d[ci] === 'edit' || c === col_name_clickable ? { cursor: 'pointer' } : {}"
            @click="clickAction(d[ci], c, i, d)">

            <i class="pi pi-trash" v-if="d[ci] == 'delete'"></i>
            <i class="pi pi-pencil" v-if="d[ci] == 'edit'"></i>

            <div v-if="c.toLowerCase().includes('image')">
              <img :src="d[ci]" alt="profile-image" class="img-thumbnail rounded float-start" width="100"
                height="100">
            </div>
            <div v-else>
              {{ d[ci] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>