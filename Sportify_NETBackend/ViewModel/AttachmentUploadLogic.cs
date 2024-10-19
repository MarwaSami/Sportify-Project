using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class AttachmentUploadLogic
    {
        static string path= $"{ Directory.GetCurrentDirectory() }/Content/Images";
        public static string Uploadone(this IFormFile attachment)
        {
            string url ;
            
            string NewName = Guid.NewGuid().ToString() + attachment.FileName;
            FileStream file = new FileStream(path: $"{path}/{NewName}"
                , FileMode.Create);
            url= NewName;
            attachment.CopyTo(file);
            file.Position = 0;
            file.Close();
            
            return url;
        }

        public static List<string> Upload(this List<IFormFile> attachments)
        {
            List<string> Attachments = new List<string>();
            foreach (var attachment in attachments)
            {
                string NewName = Guid.NewGuid().ToString() + attachment.FileName;
                FileStream file = new FileStream(path: $"{path}/{NewName}"
                  , FileMode.Create);
                Attachments.Add(NewName);
                attachment.CopyTo(file);
                file.Position = 0;
                file.Close();
            }
            return Attachments;
        }
        public static List<string> GetFilesName(this List<string> AttachmentName)
        {

            List<string> files = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories)
                .ToList();
            return files;
        }
        public static void RemoveFile(this string FileName)
        {
            File.Delete($"{path}/{FileName}");
        }
    }
}
