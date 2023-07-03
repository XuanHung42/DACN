
using ManageProject.Core.Entities;

namespace WebApi.JwtToken
{
    public interface IJwtTokenRepository
    {
        Task<string> GenerateJwtToken(User user);

        Task<bool> IsJwtTokenValid(string token);
        Task<int> GetInfoFromToken(string token);
    }
}
