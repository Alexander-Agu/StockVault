namespace Backend.Dtos.ResponseDto
{
    public enum ResponseCode
    {
        None = 0,
        Ok = 200,
        Created = 201,
        BadRequest = 400,
        NotFound = 404,
        Unauthorized = 401,
        Forbidden = 403,
        ServerError = 500
    }
}
