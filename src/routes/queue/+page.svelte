<script lang="ts">
	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('messageFromServer', (message) => {
		console.log(message);
	});
</script>
