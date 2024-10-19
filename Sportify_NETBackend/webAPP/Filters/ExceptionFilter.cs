using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace webAPP
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            context.Result = new JsonResult(new  APIResult<string>
            {
                data="",
                message = context.Exception.Message,
                status = context.HttpContext.Response.StatusCode,
                IsSuccceed=false
            });
            base.OnException(context);
        }
    }
}
