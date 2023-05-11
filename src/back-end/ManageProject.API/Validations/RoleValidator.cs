using FluentValidation;
using ManageProject.API.Models.Role;

namespace ManageProject.API.Validations
{
    public class RoleValidator : AbstractValidator<RoleEditModel>
    {
        public RoleValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .WithMessage("Tên role không được để trống")
                .MaximumLength(100)
                .WithMessage("Tên role tối đa 100 ký tự");

            RuleFor(p => p.Description)
                .NotEmpty()
                .WithMessage("Mô tả không được để trống")
                .MaximumLength(100)
                .WithMessage("Mô tả tối đa 100 ký tự");

        }
    }
}
