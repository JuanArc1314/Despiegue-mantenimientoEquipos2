# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY EquipmentService.API/EquipmentService.API.csproj EquipmentService.API/
COPY EquipmentService.Application/EquipmentService.Application.csproj EquipmentService.Application/
COPY EquipmentService.Domain/EquipmentService.Domain.csproj EquipmentService.Domain/
COPY EquipmentService.Infrastructure/EquipmentService.Infrastructure.csproj EquipmentService.Infrastructure/
RUN dotnet restore EquipmentService.API/EquipmentService.API.csproj

COPY . .
RUN dotnet publish EquipmentService.API/EquipmentService.API.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "EquipmentService.API.dll"]
