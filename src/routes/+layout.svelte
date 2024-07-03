<script>
	// @ts-ignore
	import { currentUser, signOut } from '$lib/db/databaseAuth';
	import { ActionIcon, Button, Flex, Grid, Group } from '@svelteuidev/core';
	import { Exit } from 'radix-icons-svelte';
</script>

<Grid>
	<Grid.Col span={10}></Grid.Col>
	<Grid.Col span={2} offset={0}>
		<Flex justify="right">
			{#if $currentUser}
				<ActionIcon color="blue" size="xl" on:click={signOut} variant="filled" radius="lg">
					<Exit size={20} />
				</ActionIcon>
			{/if}
		</Flex>
	</Grid.Col>
</Grid>

<slot></slot>
