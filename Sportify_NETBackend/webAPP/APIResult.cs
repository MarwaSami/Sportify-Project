namespace webAPP
{
    public class APIResult<T>
    {
        public T data { get; set; }
        public string message { get; set; }
        public int status { get; set; }
        public bool IsSuccceed { get; set; }
    }
}
