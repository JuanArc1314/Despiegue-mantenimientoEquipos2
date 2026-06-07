# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY MaintenanceService.API/MaintenanceService.API.csproj MaintenanceService.API/
COPY MaintenanceService.Application/MaintenanceService.Application.csproj MaintenanceService.Application/
COPY MaintenanceService.Domain/MaintenanceService.Domain.csproj MaintenanceService.Domain/
COPY MaintenanceService.Infrastructure/MaintenanceService.Infrastructure.csproj MaintenanceService.Infrastructure/
RUN dotnet restore MaintenanceService.API/MaintenanceService.API.csproj

COPY . .
RUN dotnet publish MaintenanceService.API/MaintenanceService.API.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MaintenanceService.API.dll"]
