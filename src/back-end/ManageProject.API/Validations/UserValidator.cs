using FluentValidation;
using ManageProject.API.Models.Users;

namespace ManageProject.API.Validations
{
    public class UserValidator:AbstractValidator<UserEditModel>
    {
        public UserValidator() { 
        RuleFor(u=> u.Name)
                .NotEmpty()
                .WithMessage("Tên người dùng không được để trống")
                .MaximumLength(100)
                .WithMessage("Tên người dùng tối đa 100 ký tự");
            RuleFor(u => u.UrlSlug)
                .NotEmpty()
              .WithMessage("UrlSlug không được để trống")
              .MaximumLength(100)
              .WithMessage("UrlSlug tối đa 100 ký tự");
            RuleFor(u => u.Password)
            .NotEmpty()
            .WithMessage("Password không được để trống")
            .MaximumLength(50)
            .WithMessage("Tên người dùng tối đa 50 ký tự");
            RuleFor(u => u.Email)
          .NotEmpty()
          .WithMessage("Email không được để trống")
          .MaximumLength(100)
          .WithMessage("Email tối đa 100 ký tự");
            RuleFor(u => u.BirthDate)
          .GreaterThan(DateTime.MinValue)
                   .WithMessage("Ngày sinh không hợp lệ");




        }
    }
}
