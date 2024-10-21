﻿// <auto-generated />
using System;
using DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DB.Migrations
{
    [DbContext(typeof(BluroomContext))]
    [Migration("20241016202237_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DB.Chat", b =>
                {
                    b.Property<int>("Chat_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Chat_Id"));

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Tipo_Chat")
                        .HasColumnType("int");

                    b.HasKey("Chat_Id");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("DB.Mensaje", b =>
                {
                    b.Property<int>("Mensaje_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Mensaje_Id"));

                    b.Property<int>("Chat_Id")
                        .HasColumnType("int");

                    b.Property<string>("Contenido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Emisor_Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("Fecha_Envio")
                        .HasColumnType("datetime2");

                    b.Property<int>("Usuario_id")
                        .HasColumnType("int");

                    b.HasKey("Mensaje_Id");

                    b.HasIndex("Chat_Id");

                    b.HasIndex("Usuario_id");

                    b.ToTable("Mensajes");
                });

            modelBuilder.Entity("DB.Usuario", b =>
                {
                    b.Property<int>("Usuario_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Usuario_Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Usuario_Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("DB.Mensaje", b =>
                {
                    b.HasOne("DB.Chat", "Chat")
                        .WithMany("Mensajes")
                        .HasForeignKey("Chat_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DB.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("Usuario_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("DB.Chat", b =>
                {
                    b.Navigation("Mensajes");
                });
#pragma warning restore 612, 618
        }
    }
}
