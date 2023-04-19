using FluentValidation;
using ManageProject.API.Models.Process;

namespace ManageProject.API.Validations;

public class ProcessValidator : AbstractValidator<ProcessEditModel>
{
	public ProcessValidator()
	{
		RuleFor(p => p.ExcutionTime)
			.NotEmpty()
			.WithMessage("Thời gian thực hiện không để trống")
			.MaximumLength(100)
			.WithMessage("Thời gian thực hiện tối đa 100 ký tự");

		RuleFor(p => p.Start);
		RuleFor(p => p.StartMaking);
		RuleFor(p => p.WriteReport);
		RuleFor(p => p.Complete);
		RuleFor(p => p.Status);

	}
}
