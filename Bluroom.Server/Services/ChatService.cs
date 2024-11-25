using Bluroom.Server.Dtos.Group;
using Bluroom.Server.Dtos.User;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Bluroom.Server.Services
{
    public class ChatService : IChatService
    {
        private readonly BluroomContext _context;

        public ChatService(BluroomContext context)
        {
            _context = context;
        }

        public async Task<Chat> Create(ChatCreateDTO chatCreateDTO)
        {

            try
            {
                var nuevoChat = new Chat
                {
                    Usuario1Id = chatCreateDTO.userId1,
                    Usuario2Id = chatCreateDTO.userId2,
                    FechaCreacion = DateTime.Now
                };

                await _context.Chats.AddAsync(nuevoChat);
                await _context.SaveChangesAsync();

                return nuevoChat;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear el grupo: {ex.Message}");
                return null;
            }
        }
        public async Task<object> IndexById(int userId)
        {
                   var chats = await _context.Chats
            .Where(c => c.Usuario1Id == userId || c.Usuario2Id == userId)
            .Select(c => new 
            {
                c.Chat_id,
                Usuario1 = new 
                {
                    Id = c.Usuario1Id,
                    Nombre = _context.Usuarios.FirstOrDefault(u => u.Usuario_Id == c.Usuario1Id).FullName,
                    Avatar = _context.Usuarios.FirstOrDefault(u => u.Usuario_Id == c.Usuario1Id).Avatar.ToString(),
                },
                Usuario2 = new 
                {
                    Id = c.Usuario2Id,
                    Nombre = _context.Usuarios.FirstOrDefault(u => u.Usuario_Id == c.Usuario2Id).FullName,
                    Avatar = _context.Usuarios.FirstOrDefault(u => u.Usuario_Id == c.Usuario2Id).Avatar.ToString()
                }
            })
            .ToListAsync();

        return chats;
        }

    }
}
