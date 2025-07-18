﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(WebAppMapsContext))]
    partial class WebAppMapsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Etage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImgPlanEtagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("Niveau")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Etages");
                });

            modelBuilder.Entity("Domain.Salle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CoordonneeX")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CoordonneeY")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<int>("EtageId")
                        .HasColumnType("int");

                    b.Property<bool?>("Favori")
                        .HasColumnType("bit");

                    b.Property<string>("ImgSallePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int?>("NbPlaces")
                        .HasColumnType("int");

                    b.Property<int?>("NbTables")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<int>("TypeSalle")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EtageId");

                    b.ToTable("Salles");

                    b.HasDiscriminator().HasValue("Salle");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Domain.SalleBubble", b =>
                {
                    b.HasBaseType("Domain.Salle");

                    b.Property<bool>("PriseElectrique")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("SalleBubble");
                });

            modelBuilder.Entity("Domain.SallePause", b =>
                {
                    b.HasBaseType("Domain.Salle");

                    b.Property<bool>("Distributeur")
                        .HasColumnType("bit");

                    b.Property<int>("Evier")
                        .HasColumnType("int");

                    b.Property<bool>("Frigo")
                        .HasColumnType("bit");

                    b.Property<int>("MicroOndes")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("SallePause");
                });

            modelBuilder.Entity("Domain.SalleReunion", b =>
                {
                    b.HasBaseType("Domain.Salle");

                    b.Property<bool>("Camera")
                        .HasColumnType("bit");

                    b.Property<bool>("Ecran")
                        .HasColumnType("bit");

                    b.Property<bool>("SystemeAudio")
                        .HasColumnType("bit");

                    b.Property<bool>("TableauBlanc")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("SalleReunion");
                });

            modelBuilder.Entity("Domain.Salle", b =>
                {
                    b.HasOne("Domain.Etage", "Etage")
                        .WithMany("Salles")
                        .HasForeignKey("EtageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Etage");
                });

            modelBuilder.Entity("Domain.Etage", b =>
                {
                    b.Navigation("Salles");
                });
#pragma warning restore 612, 618
        }
    }
}
