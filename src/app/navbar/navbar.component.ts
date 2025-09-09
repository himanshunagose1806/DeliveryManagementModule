import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  @Input() cartItemsCount: number = 0;
  isMobileMenuOpen = false;

  navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/help', label: 'Help' },
    { href: '/aboutus', label: 'About Us' }
  ];

  constructor(private router: Router) {}

  searchQuery : string = '';

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}