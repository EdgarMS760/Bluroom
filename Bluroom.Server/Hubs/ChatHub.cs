using Microsoft.AspNetCore.SignalR;

namespace Bluroom.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task EnviarMensaje(string user, string message)
        {
            await Clients.All.SendAsync("RecibirMensaje", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            // Lógica cuando un usuario se conecta (opcional)
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // Lógica cuando un usuario se desconecta (opcional)
            await base.OnDisconnectedAsync(exception);
        }
    }
}
