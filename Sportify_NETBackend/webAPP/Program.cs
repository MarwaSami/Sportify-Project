using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Models;
using webAPP;
using Repository;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http.Features;
using Services;

public class Program
{
    public static void Main()
    {
        WebApplicationBuilder appbuilder = WebApplication.CreateBuilder();

        #region APP Configurations
        appbuilder.Services.AddDbContext<SportfiyContext>(
         options =>
         {
             options.UseLazyLoadingProxies().UseSqlServer(
                 appbuilder.Configuration.GetConnectionString("Sportify"));
         }
        );
        appbuilder.Services.AddIdentity<User, IdentityRole>(
              i =>
              {
                  i.Lockout.MaxFailedAccessAttempts = 2;
                  i.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1);
                  i.User.RequireUniqueEmail = true;
                  i.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider;
              }).AddEntityFrameworkStores<SportfiyContext>().AddDefaultTokenProviders();

        appbuilder.Services.AddScoped(typeof(UnitOfWork));
        appbuilder.Services.AddScoped(typeof(AccountManager));
        appbuilder.Services.AddScoped(typeof(BlogManager));
        appbuilder.Services.AddScoped(typeof(CRoleManager));
        appbuilder.Services.AddScoped(typeof(BookingManager));
        appbuilder.Services.AddScoped(typeof(PlaceManager));
        appbuilder.Services.AddScoped(typeof(PlaceAttachmentManager));
        appbuilder.Services.AddScoped(typeof(FacilityManager));
        appbuilder.Services.AddScoped(typeof(CategoryManager));
        appbuilder.Services.AddScoped(typeof(ScheduleManager));
        appbuilder.Services.AddScoped(typeof(OwnerReviewManager));
        appbuilder.Services.AddScoped(typeof(TrainerReviewManager));
        appbuilder.Services.AddScoped(typeof(PreferredSportsManger));
        appbuilder.Services.AddScoped(typeof(TrainerManager));
        appbuilder.Services.AddScoped(typeof(TrainerBookingManager));

        appbuilder.Services.AddControllers(
            con => con.Filters.Add<ExceptionFilter>()
            ).AddNewtonsoftJson(option =>
            {
                option.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        appbuilder.Services.AddAuthentication(option =>
        {
            option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            option.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            option.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
            option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(option =>
        {
            option.SaveToken = true;
            option.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                appbuilder.Configuration["JWT:Key"]!
                )),
                ValidateAudience = false,
                ValidateIssuer = false,
            };
        });
        appbuilder.Services.AddCors(option =>
        option.AddPolicy("CorsPolicy",P => P.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
        appbuilder.Services.Configure<FormOptions>(Option =>
        {
            Option.ValueLengthLimit = int.MaxValue;
            Option.MultipartBodyLengthLimit = int.MaxValue;
            Option.MemoryBufferThreshold = int.MaxValue;

        });
        #endregion
        #region Middlewares
        WebApplication appstarter = appbuilder.Build();
        appstarter.MapDefaultControllerRoute(); 
        appstarter.UseCors("CorsPolicy");
        appstarter.UseStaticFiles(new StaticFileOptions()
        {
            FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory() + "/Content"),
            RequestPath = ""

        });
        appstarter.UseRouting();
        appstarter.UseAuthentication();
        appstarter.UseAuthorization();
        appstarter.MapDefaultControllerRoute();
        appstarter.Run();
        #endregion

    }
}