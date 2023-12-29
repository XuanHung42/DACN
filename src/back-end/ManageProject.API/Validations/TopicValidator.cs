using FluentValidation;
using ManageProject.API.Models.Process;
using ManageProject.API.Models.Topic;

namespace ManageProject.API.Validations
{
	public class TopicValidator : AbstractValidator<TopicEditModel>
	{
		public TopicValidator()
		{
			RuleFor(p => p.Name)
				.NotEmpty()
				.WithMessage("Tên tiến trình thực hiện không để trống")
				.MaximumLength(100)
				.WithMessage("Tên tiến trình thực hiện tối đa 100 ký tự");

			RuleFor(p => p.UrlSlug)
				.NotEmpty()
				.WithMessage("UrlSlug không để trống")
				.MaximumLength(100)
				.WithMessage("UrlSlug tối đa 100 ký tự");

		}
	}
}
