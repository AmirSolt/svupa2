<script lang="ts">

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import ConfirmModal from './ConfirmModal.svelte';

    export let func:()=>void
    export let buttonText:string

    const modalComponent: ModalComponent = { ref: ConfirmModal, props:{func}};

    const modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
    };
    const modalStore = getModalStore();
    function openModal(){
        modalStore.trigger(modal);
    }


</script>



<button type="button" class="btn variant-filled" on:click={openModal}>
	{buttonText}
</button>