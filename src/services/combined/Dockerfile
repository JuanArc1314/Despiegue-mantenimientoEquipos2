# ─── BUILD EquipmentService ───────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-equipment
WORKDIR /src

COPY EquipmentService/EquipmentService.API/EquipmentService.API.csproj EquipmentService.API/
COPY EquipmentService/EquipmentService.Application/EquipmentService.Application.csproj EquipmentService.Application/
COPY EquipmentService/EquipmentService.Domain/EquipmentService.Domain.csproj EquipmentService.Domain/
COPY EquipmentService/EquipmentService.Infrastructure/EquipmentService.Infrastructure.csproj EquipmentService.Infrastructure/
RUN dotnet restore EquipmentService.API/EquipmentService.API.csproj

COPY EquipmentService/ .
RUN dotnet publish EquipmentService.API/EquipmentService.API.csproj -c Release -o /app/equipment

# ─── BUILD LocationService ────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-location
WORKDIR /src

COPY LocationService/LocationService.API/LocationService.API.csproj LocationService.API/
COPY LocationService/LocationService.Application/LocationService.Application.csproj LocationService.Application/
COPY LocationService/LocationService.Domain/LocationService.Domain.csproj LocationService.Domain/
COPY LocationService/LocationService.Infrastructure/LocationService.Infrastructure.csproj LocationService.Infrastructure/
RUN dotnet restore LocationService.API/LocationService.API.csproj

COPY LocationService/ .
RUN dotnet publish LocationService.API/LocationService.API.csproj -c Release -o /app/location

# ─── RUNTIME ──────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build-equipment /app/equipment ./equipment
COPY --from=build-location  /app/location  ./location
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# EquipmentService en puerto 80, LocationService en puerto 81
EXPOSE 80 81

ENTRYPOINT ["./start.sh"]