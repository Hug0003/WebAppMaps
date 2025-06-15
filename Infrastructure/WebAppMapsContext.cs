using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Domain;
using static System.Net.Mime.MediaTypeNames;

namespace Infrastructure
{
    public class WebAppMapsContext : DbContext
    {
        public WebAppMapsContext(DbContextOptions<WebAppMapsContext> Options) : base(Options)
        {

        }

        public DbSet<SallePause> SallesPause { get; set; }
        public DbSet<Etage> Etages { get; set; }
        public DbSet<Utilisateur> Utilisateurs { get; set; }


    }
}

