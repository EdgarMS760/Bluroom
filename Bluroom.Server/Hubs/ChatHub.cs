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
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
