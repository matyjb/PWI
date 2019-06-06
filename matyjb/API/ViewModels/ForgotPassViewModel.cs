using System.ComponentModel.DataAnnotations;

namespace matyjb.API.ViewModels
{
    public class ForgotPassViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
