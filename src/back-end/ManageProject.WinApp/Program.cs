
using ManageProject.Data.Contexts;
using ManageProject.Data.Seeders;
using System;
using System.Linq;

var context = new ManageDbContext();
var seeder = new DataSeeder(context);
seeder.Initialize();

var users = context.Users.ToList();
foreach (var item in users)
{
    Console.WriteLine("{0},{1},{2},{3},{4}", item.Id, item.Name, item.Email, item.UrlSlug, item.BirthDate, item.DepartmentId);
}

//var role = context.Roles.ToList();
//foreach(var item in role)
//{
//    Console.WriteLine("{0} {1}", item.Id, item.Name, item.Description);
//}