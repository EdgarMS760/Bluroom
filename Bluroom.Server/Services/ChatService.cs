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
                var chatExistente = await _context.Chats
                    .FirstOrDefaultAsync(c =>
                        (c.Usuario1Id == chatCreateDTO.userId1 && c.Usuario2Id == chatCreateDTO.userId2) ||
                        (c.Usuario1Id == chatCreateDTO.userId2 && c.Usuario2Id == chatCreateDTO.userId1));

                if (chatExistente != null)
                {
                    Console.WriteLine("El chat ya existe.");
                    return null;
                }

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
                Console.WriteLine($"Error al crear el chat: {ex.Message}");
                return null;
            }
        }

        public async Task<object> IndexById(int userId)
        {
            try
            {
                var chats = await _context.Chats
                    .Where(c => c.Usuario1Id == userId || c.Usuario2Id == userId)
                    .Select(c => new
                    {
                        c.Chat_id,
                        Usuario1 = c.Usuario1Id == userId
                            ? null
                            : new
                            {
                                Id = c.Usuario1Id,
                                Nombre = c.Usuario1.FullName,
                                Avatar = c.Usuario1.Avatar.ToString()
                            },
                        Usuario2 = c.Usuario2Id == userId
                            ? null
                            : new
                            {
                                Id = c.Usuario2Id,
                                Nombre = c.Usuario2.FullName,
                                Avatar = c.Usuario2.Avatar.ToString()
                            }
                    })
                    .ToListAsync();

                return chats;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener los chats: {ex.Message}");
                return null;
            }
        }


    }
}
