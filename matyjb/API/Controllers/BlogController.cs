using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using matyjb.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace matyjb.API.Controllers
{
    [Route("api/[controller]")]
    public class BlogController : Controller
    {
        private static IEnumerable<BlogPost> blogPosts = new List<BlogPost>
        {
            new BlogPost()
            {
                Title="ASP.NET",
                Content="Stronka oparta na ASP.NET",
                Date = new DateTime(2019,5,22)
            },
            new BlogPost()
            {
                Title="Title1",
                Content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam rem eligendi ipsum officiis ad ratione facere velit tenetur reprehenderit labore, non voluptatibus mollitia, aperiam unde dolore eaque suscipit. Veritatis, quam.",
                Date = new DateTime(2019,4,2)
            },
        };

        [HttpGet("[action]")]
        public IEnumerable<BlogPost> all()
        {
            return blogPosts;
        }
    }
}
