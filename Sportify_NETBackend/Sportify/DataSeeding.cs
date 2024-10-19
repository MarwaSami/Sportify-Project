using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public static class DataSeeding
    {
        public static void DataSeed(this ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Category>().HasData(
                new Category(){ID= 1 , Name = "Soccer", Pic = "/Images/Soccer.png" },
                new Category(){ID= 2 , Name = "Swimming", Pic = "/Images/Swimming.png", },
                new Category(){ID= 3 , Name = "BasketBall", Pic = "/Images/BasketBall.png"},
                new Category(){ID= 4 , Name = "Tennis", Pic = "/Images/Tennis.png", },
                new Category(){ID= 5 , Name = "Gym", Pic = "/Images/Gym.png", },
                new Category(){ID= 6 , Name = "CkicketBall", Pic = "/Images/CkicketBall.png", },
                new Category(){ID= 7 , Name = "Athletics", Pic = "/Images/Athletics.png", },
                new Category(){ID= 8 , Name = "Squash", Pic = "/Images/Squash.png", },
                new Category(){ID= 9 , Name = "VollyBall", Pic = "/Images/VollyBall.png", });
                              
            modelBuilder.Entity<Surface>().HasData(
                new Surface() {ID = 1 , Name = "Men" },
                new Surface() {ID = 2 , Name = "Ladies" },
                new Surface() {ID = 3 , Name = "Both" });

            modelBuilder.Entity<Type>().HasData(
                new Type() {ID = 1 , Name = "Public" },
                new Type() {ID = 2 , Name = "Private" },
                new Type() {ID = 3 , Name = "Both" });

            modelBuilder.Entity<Facility>().HasData(
                new Facility() {ID= 1, Name = "Locker Room" },
                new Facility() {ID= 2, Name = "Shower Room" },
                new Facility() {ID= 3, Name = "Rest Room" },
                new Facility() {ID= 4, Name = "Changing Room" },
                new Facility() {ID= 5, Name = "Free Parking" },
                new Facility() {ID= 6, Name = "Flood Lights" },
                new Facility() {ID= 7, Name = "Air Condtioner" },
                new Facility() {ID= 8, Name = "Cantine" },
                new Facility() {ID= 9, Name = "Other" });

        }
    }
}
