using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Ortoba.Data
{
    public class Team
    {
        public Team()
        {
            
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public int Score { get; set; }
    }
}
