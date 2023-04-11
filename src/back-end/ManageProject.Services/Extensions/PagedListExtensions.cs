using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using ManageProject.Core.Collections;
using static ManageProject.Core.Contracts.IPagedList;

using ManageProject.Core.Contracts;
using Microsoft.IdentityModel.Tokens;

namespace ManageProject.Services.Extensions
{
	public static class PagedListExtensions
	{
        public static string GetOrderExpression(
     this IPagingParams pagingParams,
     string defaultColumn = "Id")
        {
            var column = string.IsNullOrWhiteSpace(pagingParams.SortColumn)
              ? defaultColumn
              : pagingParams.SortColumn;

            var order = "ASC".Equals(pagingParams.SortOrder, StringComparison.OrdinalIgnoreCase)
              ? pagingParams.SortOrder : "DESC";

            return $"{column} {order}";
        }

        public static async Task<IPagedList<T>> ToPagedListAsync<T>(
          this IQueryable<T> source,
          IPagingParams pagingParams,
          CancellationToken cancellationToken = default)
        {
            if (source.IsNullOrEmpty())
            {
                return new PagedList<T>(
                  new List<T>(),
                  pagingParams.PageNumber,
                  pagingParams.PageSize,
                  0);
            }
            var totalCount = await source.CountAsync(cancellationToken);
            var items = await source
              .OrderBy(pagingParams.GetOrderExpression())
              .Skip((pagingParams.PageNumber - 1) * pagingParams.PageSize)
              .Take(pagingParams.PageSize)
              .ToListAsync(cancellationToken);

            return new PagedList<T>(
              items,
              pagingParams.PageNumber,
              pagingParams.PageSize,
              totalCount);
        }

        public static async Task<IPagedList<T>> ToPagedListAsync<T>(
          this IQueryable<T> source,
          int pageNumber = 1,
          int pageSize = 10,
          string sortColumn = "Id",
          string sortOrder = "DESC",
          CancellationToken cancellationToken = default)
        {
            if (source.IsNullOrEmpty())
            {
                return new PagedList<T>(
                  new List<T>(),
                  pageNumber,
                  pageSize,
                  0);
            }
            var totalCount = await source.CountAsync(cancellationToken);
            var items = await source
              .OrderBy($"{sortColumn} {sortOrder}")
              .Skip((pageNumber - 1) * pageSize)
              .Take(pageSize)
              .ToListAsync(cancellationToken);

            return new PagedList<T>(
              items,
              pageNumber,
              pageSize,
              totalCount);
        }
    }

}
