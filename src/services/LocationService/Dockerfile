# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY LocationService.API/LocationService.API.csproj LocationService.API/
COPY LocationService.Application/LocationService.Application.csproj LocationService.Application/
COPY LocationService.Domain/LocationService.Domain.csproj LocationService.Domain/
COPY LocationService.Infrastructure/LocationService.Infrastructure.csproj LocationService.Infrastructure/
RUN dotnet restore LocationService.API/LocationService.API.csproj

COPY . .
RUN dotnet publish LocationService.API/LocationService.API.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "LocationService.API.dll"]
