using FluentValidation;
using ManageProject.API.Models.Departments;

namespace ManageProject.API.Validations
{
	public class DepartmentValidator : AbstractValidator<DepartmentEditModel>
	{
		public DepartmentValidator()
		{
			RuleFor(d => d.Name)
				.NotEmpty()
				.WithMessage("Tên khoa không được để trống")
				.MaximumLength(100)
				.WithMessage("Tên khoa tối đa 100 ký tự");

			RuleFor(d => d.UrlSlug)
				.NotEmpty()
				.WithMessage("UrlSlug không được để trống")
				.MaximumLength(100)
				.WithMessage("UrlSlug tối đa 100 ký tự");



		}
	}
}
