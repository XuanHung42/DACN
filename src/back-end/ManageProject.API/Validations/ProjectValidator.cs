using FluentValidation;
using ManageProject.API.Models.Project;

namespace ManageProject.API.Validations
{
	public class ProjectValidator : AbstractValidator<ProjectEditModel>
	{
		public ProjectValidator() 
		{
			RuleFor(p => p.Name)
				.NotEmpty()
				.WithMessage("Tên khoa không được để trống")
				.MaximumLength(100)
				.WithMessage("Tên khoa tối đa 100 ký tự");

			//RuleFor(p => p.UrlSlug)
			//	.NotEmpty()
			//	.WithMessage("UrlSlug không được để trống")
			//	.MaximumLength(100)
			//	.WithMessage("UrlSlug tối đa 100 ký tự");

			RuleFor(p => p.Description)
				.NotEmpty()
				.WithMessage("Description không được để trống")
				.MaximumLength(5000)
				.WithMessage("UrlSlug tối đa 5000 ký tự");

			RuleFor(p => p.ShortDescription)
				.NotEmpty()
				.WithMessage("ShortDescription không được để trống")
				.MaximumLength(500)
				.WithMessage("ShortDescription tối đa 500 ký tự");

			RuleFor(p => p.CostProject)
				.NotEmpty()
				.WithMessage("CostProject không được để trống")
				.MaximumLength(100)
				.WithMessage("CostProject tối đa 100 ký tự");

			RuleFor(p => p.UserNumber)
				.NotEmpty()
				.WithMessage("CostProject không được để trống");
		}
	}
}
