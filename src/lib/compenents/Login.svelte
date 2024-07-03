<script lang="ts">
	import {
		Button,
		Card,
		Input,
		Space,
		Title,
		Text,
		PasswordInput,
		Group,
		NativeSelect,
		Notification
	} from '@svelteuidev/core';
	import { onMount } from 'svelte';

	import { signUp, login } from '$lib/db/databaseAuth';
	import { getAllGroups } from '$lib/db/databaseGroups';
	import { Cross2 } from 'radix-icons-svelte';

	// variables
	let willSignUp = false;
	let notification = false;

	let notificationTitle = '';

	let username = '';
	let password = '';
	let email = '';
	let groupName = '';

	let allGroups: any[] = [];

	// hooks
	onMount(async () => {
		const resultList = await getAllGroups();
		allGroups = resultList;
	});

	// functions
	function notifyError(title: string) {
		notificationTitle = title;
		notification = true;
		setTimeout(() => (notification = false), 2000);
	}

	// handlers
	async function loginHandler() {
		let response = await login(username, password);
		// @ts-ignore
		notifyError(response.data.message);
	}

	async function signUpHandler() {
		let response = await signUp(username, password, email, groupName);
		// @ts-ignore
		notifyError(response.data.message);
	}
</script>

<form on:submit|preventDefault>
	<Card>
		{#if willSignUp}
			<Title order={3}>Sign Up</Title>
		{:else}
			<Title order={3}>Login</Title>
		{/if}
		<Space h="md" />
		<Input autocomplete="off" placeholder="Name" bind:value={username} />
		<Space h="sm" />
		<PasswordInput autocomplete="off" placeholder="Password" bind:value={password} />
		<Space h="sm" />
		{#if willSignUp}
			<Input autocomplete="off" placeholder="Email" bind:value={email} />
			<Space h="sm" />
			<NativeSelect
				placeholder="Gruppe"
				data={allGroups.map((val) => val.name)}
				bind:value={groupName}
			/>
			<Space h="sm" />
			<Group>
				<Button on:click={signUpHandler}>Sign Up</Button>
				<Button on:click={() => (willSignUp = false)}>Login?</Button>
			</Group>
		{:else}
			<Group>
				<Button on:click={loginHandler}>Login</Button>
				<Button on:click={() => (willSignUp = true)}>Signup?</Button>
			</Group>
		{/if}
	</Card>
</form>

{#if notification}
	<div class="notification">
		<Notification
			icon={Cross2}
			color="red"
			on:close={() => (notification = false)}
			title={notificationTitle}
		></Notification>
	</div>
{/if}

<style>
	.notification {
		position: absolute;
		right: 1rem;
		bottom: 3rem;
	}
</style>
