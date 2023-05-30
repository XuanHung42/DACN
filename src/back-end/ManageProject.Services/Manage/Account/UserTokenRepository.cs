using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Account
{
	public class UserTokenRepository : IUserTokenRepository
	{
		private readonly ManageDbContext _context;
		public UserTokenRepository(ManageDbContext context)
		{
			_context = context;
		}

		public async Task<UserToken> AddOrUpdateUserToken(int userId, string Token, CancellationToken cancellationToken = default)
		{
			var user = await _context.Set<UserToken>().FirstOrDefaultAsync(x => x.UserId == userId);
			if (user == null)
			{
				user = new UserToken()
				{
					UserId = userId,
					Token = Token,
					Status = true,
					Expired = DateTime.Now

				};
				_context.Add(user);
			}
			else
			{
				user.Token = Token;
				user.Status = true;

			}

			await _context.SaveChangesAsync();
			return user;
		}

		public async Task<bool> CheckTokenIsExisted(int userId, string token)
		{
			var user = await _context.Set<UserToken>().FirstOrDefaultAsync(x => x.UserId == userId);
			if (user == null) return false;
			if (String.IsNullOrEmpty(user.Token))
			{
				return false;
			}

			return true;
		}

		public async Task<bool> SetStatusAccount(int userId, bool status, CancellationToken cancellationToken = default)
		{
			var user = await _context.Set<UserToken>().FirstOrDefaultAsync(x => x.UserId == userId);
			if (user == null)
			{
				return false;
			}
			user.Status = status;
			return await _context.SaveChangesAsync() > 0;
		}
	}
}
