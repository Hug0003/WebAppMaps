using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    internal class SallePause : Salle
    {
        public int MicroOndes { get; set; }
        public bool Frigo { get; set; }
        public int Evier { get; set; }


    }
}
