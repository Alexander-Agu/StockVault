namespace Backend.Dtos.ResponseDto
{
    public class ApiResponse<T>
    {
        public ResponseCode ResponseCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }
}
