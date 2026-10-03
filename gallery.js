/**
 * LUXURY PINK FAIRYTALE — GALLERY & MODAL ENGINE (gallery.js)
 */

(function () {
  'use strict';

  // =====================================================
  // LAN ANH — PORTFOLIO PROJECTS DATA
  // =====================================================

  const projectsData = {

    // -----------------------------------------------------
    // 01. NÉT HUẾ
    // -----------------------------------------------------

    'net-hue': {
      title: 'Nét Huế',

      subtitle: 'Advertising Content & Production',

      role: 'Content & Production Support',

      year: 'Team Project',

      category: 'Marketing & Content',

      image: 'assets/images/nethue.jpg',

      description:
        'Dự án tham gia xây dựng nội dung và hỗ trợ sản xuất video quảng bá cho Nét Huế tại Aeon Mall Xuân Thủy.',

      story:
        'Trong dự án, mình tham gia lên ý tưởng script quay quảng cáo cho Nét Huế. Cùng với các thành viên trong nhóm, mình hoàn thiện outline để phục vụ bài report. Mình cũng trực tiếp hỗ trợ setup, quay chụp và phối hợp cùng team trong buổi production.',

      skills: [
        'Content Planning',
        'Script Development',
        'Teamwork',
        'Production Support'
      ],

      deliverables: [
        'Ý tưởng & script quảng cáo',
        'Outline nội dung',
        'Hỗ trợ setup buổi quay',
        'Quay & chụp cùng team'
      ]
    },


    // -----------------------------------------------------
    // 02. VIC MEDIA
    // -----------------------------------------------------

    'vic-media': {
      title: 'Go-to-Market cho VIC MEDIA',

      subtitle: 'Business & Marketing Strategy',

      role: 'Marketing Strategy & Research',

      year: 'Team Project',

      category: 'Marketing Strategy',

      image: 'assets/images/vicmedia.jpg',

      description:
        'Xây dựng kế hoạch Go-to-Market cho dịch vụ truyền thông – sản xuất Media của VIC MEDIA, tập trung vào mô hình kinh doanh, khách hàng mục tiêu và thị trường.',

      story:
        'Trong dự án, mình tham gia xây dựng Business Model Canvas và phát hiện những khoảng trống trong mô hình. Mình chủ động liên hệ với giám đốc công ty để gặp mặt trao đổi, qua đó hiểu thêm về doanh nghiệp và các dịch vụ đang cung cấp. Bên cạnh đó, mình tham gia nghiên cứu khách hàng mục tiêu, phân tích thị trường và xây dựng kênh TikTok trong giai đoạn thử nghiệm quảng bá.',

      skills: [
        'Business Model Canvas',
        'Market Research',
        'Customer Research',
        'Marketing Strategy',
        'Content Planning'
      ],

      deliverables: [
        'Business Model Canvas',
        'Phân tích khách hàng mục tiêu',
        'Nghiên cứu thị trường',
        'Định hướng kênh TikTok',
        'Kế hoạch Go-to-Market'
      ]
    },


    // -----------------------------------------------------
    // 03. PCCC
    // -----------------------------------------------------

    'pccc': {
      title: 'Dự án tuyên truyền phòng cháy chữa cháy',

      subtitle: 'Fire Safety Awareness Project',

      role: 'Communication & Content Support',

      year: '2023',

      category: 'Communication Campaign',

      image: 'assets/images/pccc.jpg',

      description:
        'Dự án truyền thông nâng cao nhận thức về phòng cháy chữa cháy được thực hiện trong khuôn khổ môn học năm nhất.',

      story:
        'Mình cùng team xây dựng một fanpage Facebook nhằm tuyên truyền các kiến thức và biện pháp phòng cháy chữa cháy. Mình hỗ trợ tìm hiểu thông tin về PCCC trước khi xây dựng nội dung, đồng thời kêu gọi bạn bè và người quen tham gia seeding để tăng lượng người tiếp cận và theo dõi fanpage.',

      skills: [
        'Social Media',
        'Content Research',
        'Communication',
        'Teamwork'
      ],

      deliverables: [
        'Fanpage Facebook',
        'Nội dung tuyên truyền',
        'Nghiên cứu thông tin PCCC',
        'Seeding & Community Outreach'
      ]
    },


    // -----------------------------------------------------
    // 04. EMAIL MARKETING & CONTENT DESIGN
    // -----------------------------------------------------

    'email-marketing': {
      title: 'Email Marketing & Content Design',

      subtitle: 'Club Communication Projects',

      role: 'Design & Content',

      year: 'Club Projects',

      category: 'Club Communication',

      image: 'assets/images/clb.jpg',

      description:
        'Tham gia thiết kế và xây dựng nội dung email phục vụ hoạt động tuyển thành viên, truyền thông sự kiện và chăm sóc người tham dự.',

      story:
        'Mình tham gia thiết kế và xây dựng nội dung cho nhiều loại email của câu lạc bộ, bao gồm email tuyển gen, email mời tài trợ, email thông báo Talkshow, email xác nhận đăng ký thành công và email gửi tới người tham dự. Công việc giúp mình rèn luyện khả năng viết nội dung, thiết kế và truyền tải thông tin một cách rõ ràng, phù hợp với từng nhóm người nhận.',

      skills: [
        'Email Marketing',
        'Content Writing',
        'Graphic Design',
        'Event Communication'
      ],

      deliverables: [
        'Email tuyển thành viên',
        'Email mời tài trợ',
        'Email thông báo Talkshow',
        'Email xác nhận đăng ký',
        'Email chăm sóc người tham dự'
      ]
    }

  };


  // =====================================================
  // MODAL DOM ELEMENTS
  // =====================================================

  const modalBackdrop =
    document.getElementById('project-modal');

  const modalClose =
    document.getElementById('modal-close-btn');

  const modalImage =
    document.getElementById('modal-img');

  const modalCategory =
    document.getElementById('modal-category');

  const modalTitle =
    document.getElementById('modal-title');

  const modalSubtitle =
    document.getElementById('modal-subtitle');

  const modalRole =
    document.getElementById('modal-role');

  const modalYear =
    document.getElementById('modal-year');

  const modalDesc =
    document.getElementById('modal-desc');

  const modalStory =
    document.getElementById('modal-story');

  const modalSkills =
    document.getElementById('modal-skills');

  const modalDeliverables =
    document.getElementById('modal-deliverables');


  // =====================================================
  // OPEN PROJECT MODAL
  // =====================================================

  function openProjectModal(projectId) {

    const data = projectsData[projectId];

    if (!data || !modalBackdrop) {
      console.warn(
        `Project "${projectId}" not found.`
      );
      return;
    }


    // IMAGE

    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = data.title;
    }


    // CATEGORY

    if (modalCategory) {
      modalCategory.textContent = data.category;
    }


    // TITLE

    if (modalTitle) {
      modalTitle.textContent = data.title;
    }


    // SUBTITLE

    if (modalSubtitle) {
      modalSubtitle.textContent = data.subtitle;
    }


    // ROLE

    if (modalRole) {
      modalRole.textContent = data.role;
    }


    // YEAR / TYPE

    if (modalYear) {
      modalYear.textContent = data.year;
    }


    // DESCRIPTION

    if (modalDesc) {
      modalDesc.textContent = data.description;
    }


    // STORY

    if (modalStory) {
      modalStory.textContent = data.story;
    }


    // SKILLS

    if (modalSkills) {

      modalSkills.innerHTML = data.skills
        .map(
          (skill) =>
            `<span class="skill-tag">✦ ${skill}</span>`
        )
        .join('');

    }


    // DELIVERABLES

    if (modalDeliverables) {

      modalDeliverables.innerHTML = data.deliverables
        .map(
          (deliverable) =>
            `<li>${deliverable}</li>`
        )
        .join('');

    }


    // SHOW MODAL

    modalBackdrop.classList.add('active');

    document.body.style.overflow = 'hidden';

  }


  // =====================================================
  // CLOSE PROJECT MODAL
  // =====================================================

  function closeProjectModal() {

    if (!modalBackdrop) {
      return;
    }

    modalBackdrop.classList.remove('active');

    document.body.style.overflow = '';

  }


  // =====================================================
  // ATTACH EVENT LISTENERS
  // =====================================================

  document.addEventListener(
    'DOMContentLoaded',
    () => {


      // -------------------------------------------------
      // PROJECT TRIGGERS
      // -------------------------------------------------

      document
        .querySelectorAll('[data-project-id]')
        .forEach((trigger) => {

          trigger.addEventListener(
            'click',
            (e) => {

              e.preventDefault();

              const id =
                trigger.getAttribute(
                  'data-project-id'
                );

              if (id) {
                openProjectModal(id);
              }

            }
          );

        });


      // -------------------------------------------------
      // CLOSE BUTTON
      // -------------------------------------------------

      if (modalClose) {

        modalClose.addEventListener(
          'click',
          closeProjectModal
        );

      }


      // -------------------------------------------------
      // CLICK OUTSIDE MODAL
      // -------------------------------------------------

      if (modalBackdrop) {

        modalBackdrop.addEventListener(
          'click',
          (e) => {

            if (
              e.target === modalBackdrop
            ) {

              closeProjectModal();

            }

          }
        );

      }


      // -------------------------------------------------
      // ESCAPE KEY
      // -------------------------------------------------

      document.addEventListener(
        'keydown',
        (e) => {

          if (
            e.key === 'Escape' &&
            modalBackdrop &&
            modalBackdrop.classList.contains('active')
          ) {

            closeProjectModal();

          }

        }
      );

    }
  );


  // =====================================================
  // GLOBAL FUNCTIONS
  // =====================================================

  window.openProjectModal =
    openProjectModal;

  window.closeProjectModal =
    closeProjectModal;

})();